package com.gurukul.service;

import com.gurukul.dto.*;
import com.gurukul.entity.*;
import com.gurukul.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class DataService {

    @Autowired
    private HeroSlideRepository heroSlideRepository;

    @Autowired
    private HomeResultRepository homeResultRepository;

    @Autowired
    private AboutRepository aboutRepository;

    @Autowired
    private ManagementRepository managementRepository;

    @Autowired
    private AcademicUnitRepository academicUnitRepository;

    @Autowired
    private PrincipalRepository principalRepository;

    @Autowired
    private UnitFeatureRepository unitFeatureRepository;

    @Autowired
    private UnitResultRepository unitResultRepository;

    @Autowired
    private CircularRepository circularRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private GalleryImageRepository galleryImageRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SocialMediaRepository socialMediaRepository;

    @Autowired
    private UnitContactRepository unitContactRepository;

    @Autowired
    private AdmissionInquiryRepository admissionInquiryRepository;

    @Autowired
    private StudentRegistrationRepository studentRegistrationRepository;

    @Autowired
    private WhatsAppService whatsAppService;

    private final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");

    // Public API Methods - Get All Data
    public AppDataDTO getAllData() {
        AppDataDTO dto = new AppDataDTO();

        // Hero Slides
        dto.setHeroSlides(heroSlideRepository.findByIsActiveTrueOrderByDisplayOrderAsc().stream()
            .map(hs -> new HeroSlideDTO(hs.getId(), hs.getTitle(), hs.getSubtitle(), hs.getImageUrl()))
            .collect(Collectors.toList()));

        // Home Results
        Map<String, String> homeResults = new HashMap<>();
        homeResultRepository.findAll().forEach(hr -> homeResults.put(hr.getCategory(), hr.getDescription()));
        dto.setHomeResults(homeResults);

        // About
        About about = aboutRepository.findById(1L).orElse(new About());
        dto.setAbout(new AboutDTO(about.getShortInfo(), about.getVision(), about.getMission()));

        // Management
        dto.setManagement(managementRepository.findAllByOrderByDisplayOrderAsc().stream()
            .map(m -> new ManagementDTO(m.getId(), m.getName(), m.getTitle(), m.getPhotoUrl()))
            .collect(Collectors.toList()));

        // Units
        dto.setUnits(academicUnitRepository.findAll().stream()
            .map(this::convertToUnitDTO)
            .collect(Collectors.toList()));

        // Homepage Circulars (unit is null)
        dto.setCirculars(circularRepository.findByUnitIsNullAndIsActiveTrueOrderByDateDesc().stream()
            .map(this::convertToCircularDTO)
            .collect(Collectors.toList()));

        // Events
        dto.setEvents(eventRepository.findByIsActiveTrueOrderByIdDesc().stream()
            .map(e -> new EventDTO(e.getId(), e.getName(), e.getImageUrl()))
            .collect(Collectors.toList()));

        // Gallery
        Map<String, List<String>> gallery = new HashMap<>();
        List<String> categories = Arrays.asList("festivals", "achievements", "sports", "activities");
        for (String category : categories) {
            gallery.put(category, galleryImageRepository.findByUnitIsNullAndCategoryOrderByDisplayOrderAsc(category).stream()
                .map(GalleryImage::getImageUrl)
                .collect(Collectors.toList()));
        }
        dto.setGallery(gallery);

        // Contact
        Contact contact = contactRepository.findById(1L).orElse(new Contact());
        dto.setContact(new ContactDTO(contact.getEmail(), contact.getWhatsapp()));

        // Social Media
        SocialMedia socialMedia = socialMediaRepository.findById(1L).orElse(new SocialMedia());
        dto.setSocialMedia(new SocialMediaDTO(socialMedia.getFacebook(), socialMedia.getInstagram(), socialMedia.getYoutube()));

        return dto;
    }

    // Get Unit by unitId
    public AcademicUnitDTO getUnitByUnitId(String unitId) {
        Optional<AcademicUnit> unitOpt = academicUnitRepository.findByUnitId(unitId);
        if (unitOpt.isEmpty()) {
            throw new RuntimeException("Unit with unitId '" + unitId + "' not found");
        }
        AcademicUnit unit = unitOpt.get();
        // Force eager loading of lazy relationships within the transaction
        if (unit.getPrincipal() != null) {
            unit.getPrincipal().getName(); // Trigger lazy load
        }
        if (unit.getContact() != null) {
            unit.getContact().getAddress(); // Trigger lazy load
            if (unit.getContact().getPhones() != null) {
                unit.getContact().getPhones().size(); // Trigger lazy load
            }
        }
        unit.getFeatures().size(); // Trigger lazy load
        unit.getResults().size(); // Trigger lazy load
        unit.getCirculars().size(); // Trigger lazy load
        unit.getGallery().size(); // Trigger lazy load
        return convertToUnitDTO(unit);
    }

    private AcademicUnitDTO convertToUnitDTO(AcademicUnit unit) {
        AcademicUnitDTO dto = new AcademicUnitDTO();
        dto.setId(unit.getId());
        dto.setUnitId(unit.getUnitId());
        dto.setName(unit.getName());
        dto.setPhoto(unit.getPhotoUrl());

        // Principal
        if (unit.getPrincipal() != null) {
            Principal p = unit.getPrincipal();
            dto.setPrincipal(new PrincipalDTO(p.getName(), p.getPhotoUrl(), p.getMessage()));
        }

        // Features
        dto.setFeatures(unit.getFeatures().stream()
            .map(UnitFeature::getDescription)
            .collect(Collectors.toList()));

        // Results
        dto.setResults(unit.getResults().stream()
            .map(r -> new UnitResultDTO(r.getYear(), r.getDetails()))
            .collect(Collectors.toList()));

        // Circulars
        dto.setCirculars(unit.getCirculars().stream()
            .filter(c -> c.getIsActive())
            .map(this::convertToCircularDTO)
            .collect(Collectors.toList()));

        // Gallery
        dto.setGallery(unit.getGallery().stream()
            .map(GalleryImage::getImageUrl)
            .collect(Collectors.toList()));

        // Contact
        if (unit.getContact() != null) {
            UnitContact uc = unit.getContact();
            List<String> phones = uc.getPhones().stream()
                .map(UnitPhone::getPhoneNumber)
                .collect(Collectors.toList());
            dto.setContact(new UnitContactDTO(uc.getAddress(), phones, uc.getMapEmbedUrl()));
        }

        return dto;
    }

    private CircularDTO convertToCircularDTO(Circular circular) {
        String unitName = circular.getUnit() != null ? circular.getUnit().getName() : circular.getUnit() != null ? "General" : null;
        return new CircularDTO(circular.getId(), unitName, circular.getSubject(),
            circular.getDate().format(dateFormatter));
    }

    // Save Admission Inquiry
    public AdmissionInquiry saveAdmissionInquiry(AdmissionInquiryDTO dto) {
        AdmissionInquiry inquiry = new AdmissionInquiry();
        inquiry.setName(dto.getName());
        inquiry.setMobile(dto.getMobile());
        inquiry.setQuery(dto.getQuery());
        inquiry.setUnitName(dto.getUnitName());
        return admissionInquiryRepository.save(inquiry);
    }

    // Save Student Registration
//    public StudentRegistration saveStudentRegistration(StudentRegistrationDTO dto) {
//        StudentRegistration registration = new StudentRegistration();
//		registration.setBranch(dto.getBranch());
//        registration.setStudentName(dto.getStudentName());
//        registration.setSchoolName(dto.getSchoolName());
//        registration.setVillageOrCity(dto.getVillageOrCity());
//        registration.setAddress(dto.getAddress());
//        registration.setMobileNumber(dto.getMobileNumber());
//
//        // --- CHANGES START HERE ---
//        // Set new fields from DTO
//        registration.setLastExamPercentage(dto.getLastExamPercentage());
//        registration.setEmailId(dto.getEmailId());
//        registration.setInterestedFor(dto.getInterestedFor());
//        // --- CHANGES END HERE ---
//
//        return studentRegistrationRepository.save(registration);
//    }

    public StudentRegistration saveStudentRegistration(StudentRegistrationDTO dto) {

        StudentRegistration registration = new StudentRegistration();
        registration.setBranch(dto.getBranch());
        registration.setStudentName(dto.getStudentName());
        registration.setSchoolName(dto.getSchoolName());
        registration.setVillageOrCity(dto.getVillageOrCity());
        registration.setAddress(dto.getAddress());
        registration.setMobileNumber(dto.getMobileNumber());

        // New fields
        registration.setLastExamPercentage(dto.getLastExamPercentage());
        registration.setEmailId(dto.getEmailId());
        registration.setInterestedFor(dto.getInterestedFor());

        // SAVE in DB
        StudentRegistration saved = studentRegistrationRepository.save(registration);


        try {
            whatsAppService.sendRegistrationPdf(saved.getMobileNumber());
            System.out.println("WhatsApp message sent to: " + saved.getMobileNumber());
        } catch (Exception e) {
            System.out.println("WhatsApp sending failed: " + e.getMessage());
            e.printStackTrace();
        }

        return saved;
    }



    // Admin methods for managing data - these will be called by controllers
    // For brevity, I'll create specific methods that can be used by admin controllers

    public HeroSlide saveHeroSlide(HeroSlide heroSlide) {
        return heroSlideRepository.save(heroSlide);
    }

    public void deleteHeroSlide(Long id) {
        heroSlideRepository.deleteById(id);
    }

    public HomeResult saveHomeResult(HomeResult homeResult) {
        return homeResultRepository.save(homeResult);
    }

    public About saveAbout(About about) {
        if (about.getId() == null) {
            about.setId(1L);
        }
        return aboutRepository.save(about);
    }

    public Management saveManagement(Management management) {
        return managementRepository.save(management);
    }

    public void deleteManagement(Long id) {
        managementRepository.deleteById(id);
    }

    public AcademicUnit saveAcademicUnit(AcademicUnit unit) {
        return academicUnitRepository.save(unit);
    }

    public void deleteAcademicUnit(Long id) {
        academicUnitRepository.deleteById(id);
    }

    public Principal savePrincipal(Principal principal) {
        return principalRepository.save(principal);
    }

    public UnitFeature saveUnitFeature(UnitFeature feature) {
        return unitFeatureRepository.save(feature);
    }

    public void deleteUnitFeature(Long id) {
        unitFeatureRepository.deleteById(id);
    }

    public UnitResult saveUnitResult(UnitResult result) {
        return unitResultRepository.save(result);
    }

    public void deleteUnitResult(Long id) {
        unitResultRepository.deleteById(id);
    }

    public Circular saveCircular(Circular circular) {
        return circularRepository.save(circular);
    }

    public void deleteCircular(Long id) {
        circularRepository.deleteById(id);
    }

    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    public GalleryImage saveGalleryImage(GalleryImage image) {
        return galleryImageRepository.save(image);
    }

    public void deleteGalleryImage(Long id) {
        galleryImageRepository.deleteById(id);
    }

    public Contact saveContact(Contact contact) {
        if (contact.getId() == null) {
            contact.setId(1L);
        }
        return contactRepository.save(contact);
    }

    public SocialMedia saveSocialMedia(SocialMedia socialMedia) {
        if (socialMedia.getId() == null) {
            socialMedia.setId(1L);
        }
        return socialMediaRepository.save(socialMedia);
    }

    public UnitContact saveUnitContact(UnitContact unitContact) {
        return unitContactRepository.save(unitContact);
    }

    public List<AdmissionInquiry> getAllInquiries() {
        return admissionInquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<StudentRegistration> getAllStudentRegistrations() {
        return studentRegistrationRepository.findByOrderByCreatedAtDesc();
    }

    public Optional<AcademicUnit> findUnitByUnitId(String unitId) {
        return academicUnitRepository.findByUnitId(unitId);
    }

    public List<HeroSlide> getAllHeroSlides() {
        return heroSlideRepository.findAll();
    }

    public Optional<About> getAbout() {
        return aboutRepository.findById(1L);
    }

    public Optional<Contact> getContact() {
        return contactRepository.findById(1L);
    }

    public Optional<SocialMedia> getSocialMedia() {
        return socialMediaRepository.findById(1L);
    }

    public List<Management> getAllManagement() {
        return managementRepository.findAll();
    }

    public List<AcademicUnit> getAllUnits() {
        return academicUnitRepository.findAll();
    }

    public List<HomeResult> getAllHomeResults() {
        return homeResultRepository.findAll();
    }

    public void deleteHomeResult(Long id) {
        homeResultRepository.deleteById(id);
    }

    public List<Circular> getAllCirculars() {
        return circularRepository.findAll();
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}


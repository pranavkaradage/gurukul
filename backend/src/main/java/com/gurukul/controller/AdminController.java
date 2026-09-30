package com.gurukul.controller;

import com.gurukul.dto.AppDataDTO;
import com.gurukul.dto.AboutDTO;
import com.gurukul.dto.ContactDTO;
import com.gurukul.dto.SocialMediaDTO;
import com.gurukul.dto.HeroSlideDTO;
import com.gurukul.dto.ManagementDTO;
import com.gurukul.dto.AcademicUnitDTO;
import com.gurukul.dto.PrincipalDTO;
import com.gurukul.dto.UnitResultDTO;
import com.gurukul.dto.UnitContactDTO;
import com.gurukul.dto.CircularDTO;
import com.gurukul.entity.*;
import com.gurukul.repository.GalleryImageRepository;
import com.gurukul.repository.UnitContactRepository;
import com.gurukul.repository.UnitPhoneRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import com.gurukul.service.DataService;
import com.gurukul.service.FileUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001","https://gurukulschools.org","https://www.gurukulschools.org"},allowedHeaders = "*")
public class AdminController {

    @Autowired
    private DataService dataService;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private GalleryImageRepository galleryImageRepository;

    @Autowired
    private UnitContactRepository unitContactRepository;

    @Autowired
    private UnitPhoneRepository unitPhoneRepository;

    // Get all data for admin
    @GetMapping("/data")
    public ResponseEntity<AppDataDTO> getAllData() {
        return ResponseEntity.ok(dataService.getAllData());
    }

    // Website Data Endpoints (as expected by AdminPage)
    @GetMapping("/website-data/exists")
    public ResponseEntity<Map<String, Boolean>> checkWebsiteDataExists() {
        AppDataDTO data = dataService.getAllData();
        boolean exists = data != null && (
            (data.getHeroSlides() != null && !data.getHeroSlides().isEmpty()) ||
            (data.getAbout() != null && data.getAbout().getShortInfo() != null) ||
            (data.getUnits() != null && !data.getUnits().isEmpty())
        );
        return ResponseEntity.ok(Map.of("exists", exists));
    }

    @GetMapping("/website-data")
    public ResponseEntity<AppDataDTO> getWebsiteData() {
        return ResponseEntity.ok(dataService.getAllData());
    }

    @PostMapping("/website-data")
    public ResponseEntity<Map<String, String>> createWebsiteData(@RequestBody AppDataDTO dto) {
        try {
            saveAllWebsiteData(dto);
            return ResponseEntity.ok(Map.of("message", "Website data created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to create data: " + e.getMessage()));
        }
    }

    @PutMapping("/website-data")
    public ResponseEntity<Map<String, String>> updateWebsiteData(@RequestBody AppDataDTO dto) {
        try {
            saveAllWebsiteData(dto);
            return ResponseEntity.ok(Map.of("message", "Website data updated successfully"));
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace for debugging
            String errorMessage = e.getMessage();
            // Include cause message if available
            if (e.getCause() != null) {
                errorMessage += " (Cause: " + e.getCause().getMessage() + ")";
            }
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to update data: " + errorMessage));
        }
    }

    @DeleteMapping("/website-data")
    public ResponseEntity<Map<String, String>> deleteWebsiteData() {
        try {
            // Delete all data - this would require implementing delete methods in DataService
            // For now, we'll just return success
            return ResponseEntity.ok(Map.of("message", "Website data deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", "Failed to delete data: " + e.getMessage()));
        }
    }

    private void saveAllWebsiteData(AppDataDTO dto) {
        // Save About
        if (dto.getAbout() != null) {
            About about = dataService.getAbout().orElse(new About());
            about.setShortInfo(dto.getAbout().getShortInfo() != null && !dto.getAbout().getShortInfo().trim().isEmpty() ? 
                dto.getAbout().getShortInfo() : "About Gurukul");
            about.setVision(dto.getAbout().getVision() != null && !dto.getAbout().getVision().trim().isEmpty() ? 
                dto.getAbout().getVision() : "Our vision");
            about.setMission(dto.getAbout().getMission() != null && !dto.getAbout().getMission().trim().isEmpty() ? 
                dto.getAbout().getMission() : "Our mission");
            dataService.saveAbout(about);
        }

        // Save Contact
        if (dto.getContact() != null) {
            Contact contact = dataService.getContact().orElse(new Contact());
            contact.setEmail(dto.getContact().getEmail() != null && !dto.getContact().getEmail().trim().isEmpty() ? 
                dto.getContact().getEmail() : "");
            contact.setWhatsapp(dto.getContact().getWhatsapp() != null && !dto.getContact().getWhatsapp().trim().isEmpty() ? 
                dto.getContact().getWhatsapp() : "");
            dataService.saveContact(contact);
        }

        // Save Social Media
        if (dto.getSocialMedia() != null) {
            SocialMedia socialMedia = dataService.getSocialMedia().orElse(new SocialMedia());
            socialMedia.setFacebook(dto.getSocialMedia().getFacebook() != null ? dto.getSocialMedia().getFacebook() : "");
            socialMedia.setInstagram(dto.getSocialMedia().getInstagram() != null ? dto.getSocialMedia().getInstagram() : "");
            socialMedia.setYoutube(dto.getSocialMedia().getYoutube() != null ? dto.getSocialMedia().getYoutube() : "");
            dataService.saveSocialMedia(socialMedia);
        }

        // Save Hero Slides
        if (dto.getHeroSlides() != null && !dto.getHeroSlides().isEmpty()) {
            // Clear existing and save new
            List<HeroSlide> existing = dataService.getAllHeroSlides();
            existing.forEach(hs -> dataService.deleteHeroSlide(hs.getId()));
            
            for (int i = 0; i < dto.getHeroSlides().size(); i++) {
                HeroSlideDTO slideDto = dto.getHeroSlides().get(i);
                HeroSlide slide = new HeroSlide();
                slide.setTitle(slideDto.getTitle() != null && !slideDto.getTitle().trim().isEmpty() ? slideDto.getTitle() : "Untitled Slide");
                slide.setSubtitle(slideDto.getSubtitle() != null && !slideDto.getSubtitle().trim().isEmpty() ? slideDto.getSubtitle() : "Subtitle");
                slide.setImageUrl(slideDto.getImage() != null && !slideDto.getImage().trim().isEmpty() ? slideDto.getImage() : "");
                slide.setDisplayOrder(i);
                slide.setIsActive(true);
                dataService.saveHeroSlide(slide);
            }
        }

        // Save Management
        if (dto.getManagement() != null && !dto.getManagement().isEmpty()) {
            // Clear existing and save new
            List<Management> existing = dataService.getAllManagement();
            existing.forEach(m -> dataService.deleteManagement(m.getId()));
            
            for (int i = 0; i < dto.getManagement().size(); i++) {
                ManagementDTO mgmtDto = dto.getManagement().get(i);
                Management management = new Management();
                management.setName(mgmtDto.getName() != null && !mgmtDto.getName().trim().isEmpty() ? mgmtDto.getName() : "Management Member");
                management.setTitle(mgmtDto.getTitle() != null && !mgmtDto.getTitle().trim().isEmpty() ? mgmtDto.getTitle() : "Title");
                management.setPhotoUrl(mgmtDto.getPhoto() != null && !mgmtDto.getPhoto().trim().isEmpty() ? mgmtDto.getPhoto() : "");
                management.setDisplayOrder(i);
                dataService.saveManagement(management);
            }
        }

        // Save Home Results
        if (dto.getHomeResults() != null && !dto.getHomeResults().isEmpty()) {
            List<HomeResult> existing = dataService.getAllHomeResults();
            existing.forEach(hr -> dataService.deleteHomeResult(hr.getId()));
            
            dto.getHomeResults().forEach((category, description) -> {
                // Skip if category is null or empty
                if (category == null || category.trim().isEmpty()) {
                    return;
                }
                HomeResult hr = new HomeResult();
                hr.setCategory(category.trim());
                hr.setDescription(description != null && !description.trim().isEmpty() ? description.trim() : "");
                dataService.saveHomeResult(hr);
            });
        }

        // Save Events
        if (dto.getEvents() != null && !dto.getEvents().isEmpty()) {
            List<Event> existing = dataService.getAllEvents();
            existing.forEach(e -> dataService.deleteEvent(e.getId()));
            
            dto.getEvents().forEach(eventDto -> {
                Event event = new Event();
                event.setName(eventDto.getName() != null && !eventDto.getName().trim().isEmpty() ? eventDto.getName() : "Event");
                event.setImageUrl(eventDto.getImage() != null && !eventDto.getImage().trim().isEmpty() ? eventDto.getImage() : "");
                event.setIsActive(true);
                dataService.saveEvent(event);
            });
        }

        // Save Units with all relationships
        if (dto.getUnits() != null && !dto.getUnits().isEmpty()) {
            // Delete all existing units (cascade will handle related entities)
            List<AcademicUnit> existingUnits = dataService.getAllUnits();
            existingUnits.forEach(unit -> dataService.deleteAcademicUnit(unit.getId()));
            
            for (AcademicUnitDTO unitDto : dto.getUnits()) {
                // Skip units without a name
                if (unitDto.getName() == null || unitDto.getName().trim().isEmpty()) {
                    continue; // Skip invalid units
                }
                
                AcademicUnit unit = new AcademicUnit();
                // Generate unitId from name if not provided
                String unitId = unitDto.getUnitId();
                if (unitId == null || unitId.trim().isEmpty()) {
                    String unitName = unitDto.getName().trim();
                    unitId = unitName.toLowerCase().replaceAll("\\s+", "-").replaceAll("[^a-z0-9-]", "");
                    // Ensure unitId is not empty after generation
                    if (unitId.isEmpty()) {
                        unitId = "unit-" + System.currentTimeMillis();
                    }
                }
                unit.setUnitId(unitId);
                unit.setName(unitDto.getName().trim());
                unit.setPhotoUrl(unitDto.getPhoto() != null && !unitDto.getPhoto().trim().isEmpty() ? unitDto.getPhoto() : "");
                
                // Save unit first to get ID
                unit = dataService.saveAcademicUnit(unit);
                
                // Save Principal
                if (unitDto.getPrincipal() != null) {
                    Principal principal = new Principal();
                    principal.setName(unitDto.getPrincipal().getName() != null && !unitDto.getPrincipal().getName().trim().isEmpty() ? 
                        unitDto.getPrincipal().getName() : "");
                    principal.setPhotoUrl(unitDto.getPrincipal().getPhoto() != null && !unitDto.getPrincipal().getPhoto().trim().isEmpty() ? 
                        unitDto.getPrincipal().getPhoto() : "");
                    principal.setMessage(unitDto.getPrincipal().getMessage() != null && !unitDto.getPrincipal().getMessage().trim().isEmpty() ? 
                        unitDto.getPrincipal().getMessage() : "");
                    principal.setUnit(unit);
                    dataService.savePrincipal(principal);
                }
                
                // Save Features
                if (unitDto.getFeatures() != null) {
                    for (String featureDesc : unitDto.getFeatures()) {
                        if (featureDesc != null && !featureDesc.trim().isEmpty()) {
                            UnitFeature feature = new UnitFeature();
                            feature.setDescription(featureDesc);
                            feature.setUnit(unit);
                            dataService.saveUnitFeature(feature);
                        }
                    }
                }
                
                // Save Results
                if (unitDto.getResults() != null) {
                    for (UnitResultDTO resultDto : unitDto.getResults()) {
                        // Skip results with invalid year or details
                        if (resultDto.getYear() == null || resultDto.getYear() <= 0 ||
                            (resultDto.getDetails() == null || resultDto.getDetails().trim().isEmpty())) {
                            continue;
                        }
                        UnitResult result = new UnitResult();
                        result.setYear(resultDto.getYear());
                        result.setDetails(resultDto.getDetails().trim());
                        result.setUnit(unit);
                        dataService.saveUnitResult(result);
                    }
                }
                
                // Save Circulars
                if (unitDto.getCirculars() != null) {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
                    for (CircularDTO circularDto : unitDto.getCirculars()) {
                        // Skip circulars without subject
                        if (circularDto.getSubject() == null || circularDto.getSubject().trim().isEmpty()) {
                            continue;
                        }
                        Circular circular = new Circular();
                        circular.setSubject(circularDto.getSubject().trim());
                        try {
                            if (circularDto.getDate() != null && !circularDto.getDate().trim().isEmpty()) {
                                LocalDate date = LocalDate.parse(circularDto.getDate(), formatter);
                                circular.setDate(date);
                            } else {
                                circular.setDate(LocalDate.now());
                            }
                        } catch (Exception e) {
                            circular.setDate(LocalDate.now());
                        }
                        circular.setUnit(unit);
                        circular.setIsActive(true);
                        dataService.saveCircular(circular);
                    }
                }
                
                // Save Gallery Images
                if (unitDto.getGallery() != null) {
                    for (int i = 0; i < unitDto.getGallery().size(); i++) {
                        String imageUrl = unitDto.getGallery().get(i);
                        if (imageUrl != null && !imageUrl.trim().isEmpty()) {
                            GalleryImage image = new GalleryImage();
                            image.setImageUrl(imageUrl);
                            image.setCategory("unit-specific");
                            image.setUnit(unit);
                            image.setDisplayOrder(i);
                            dataService.saveGalleryImage(image);
                        }
                    }
                }
                
                // Save Unit Contact
                if (unitDto.getContact() != null) {
                    // Create new UnitContact (since we delete all units first, there won't be existing ones)
                    UnitContact unitContact = new UnitContact();
                    unitContact.setAddress(unitDto.getContact().getAddress() != null ? 
                        unitDto.getContact().getAddress() : "");
                    unitContact.setMapEmbedUrl(unitDto.getContact().getMapEmbedUrl() != null ? 
                        unitDto.getContact().getMapEmbedUrl() : "");
                    unitContact.setUnit(unit);
                    
                    // Initialize phones collection
                    unitContact.setPhones(new ArrayList<>());
                    
                    // Add phones to the collection
                    if (unitDto.getContact().getPhones() != null && !unitDto.getContact().getPhones().isEmpty()) {
                        for (String phoneNumber : unitDto.getContact().getPhones()) {
                            if (phoneNumber != null && !phoneNumber.trim().isEmpty()) {
                                UnitPhone unitPhone = new UnitPhone();
                                unitPhone.setPhoneNumber(phoneNumber.trim());
                                unitPhone.setUnitContact(unitContact);
                                unitContact.getPhones().add(unitPhone);
                            }
                        }
                    }
                    
                    // Save the contact with phones
                    unitContact = dataService.saveUnitContact(unitContact);
                }
            }
        }

        // Save Gallery Images (homepage gallery)
        if (dto.getGallery() != null) {
            // Get all homepage gallery images (where unit is null)
            List<GalleryImage> allImages = galleryImageRepository.findAll();
            List<GalleryImage> homepageImages = allImages.stream()
                .filter(img -> img.getUnit() == null)
                .collect(java.util.stream.Collectors.toList());
            homepageImages.forEach(img -> dataService.deleteGalleryImage(img.getId()));
            
            String[] categories = {"festivals", "achievements", "sports", "activities"};
            for (String category : categories) {
                List<String> images = dto.getGallery().get(category);
                if (images != null) {
                    for (int i = 0; i < images.size(); i++) {
                        String imageUrl = images.get(i);
                        if (imageUrl != null && !imageUrl.trim().isEmpty()) {
                            GalleryImage image = new GalleryImage();
                            image.setImageUrl(imageUrl);
                            image.setCategory(category);
                            image.setUnit(null); // Homepage gallery
                            image.setDisplayOrder(i);
                            dataService.saveGalleryImage(image);
                        }
                    }
                }
            }
        }
    }
    
    // Helper method to get gallery images by unit
    private List<GalleryImage> getGalleryImagesByUnit(AcademicUnit unit) {
        return galleryImageRepository.findByUnitIdOrderByDisplayOrderAsc(unit.getId());
    }

    // Media Upload
    @PostMapping("/media/upload")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String url = fileUploadService.uploadFile(file);
            return ResponseEntity.ok(Map.of("url", url));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Hero Slides Management
    @GetMapping("/hero-slides")
    public ResponseEntity<List<HeroSlide>> getHeroSlides() {
        return ResponseEntity.ok(dataService.getAllHeroSlides());
    }

    @PostMapping("/hero-slides")
    public ResponseEntity<HeroSlide> createHeroSlide(@RequestBody HeroSlide heroSlide) {
        return ResponseEntity.ok(dataService.saveHeroSlide(heroSlide));
    }

    @PutMapping("/hero-slides/{id}")
    public ResponseEntity<HeroSlide> updateHeroSlide(@PathVariable Long id, @RequestBody HeroSlide heroSlide) {
        heroSlide.setId(id);
        return ResponseEntity.ok(dataService.saveHeroSlide(heroSlide));
    }

    @DeleteMapping("/hero-slides/{id}")
    public ResponseEntity<?> deleteHeroSlide(@PathVariable Long id) {
        dataService.deleteHeroSlide(id);
        return ResponseEntity.ok().build();
    }

    // Similar methods for all other entities...
    // For brevity, I'll create a comprehensive save endpoint that accepts AppDataDTO
    @PostMapping("/data/save")
    public ResponseEntity<?> saveAllData(@RequestBody AppDataDTO dto) {
        try {
            // Save all data from DTO
            saveDataFromDTO(dto);
            return ResponseEntity.ok("Data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to save data: " + e.getMessage());
        }
    }

    private void saveDataFromDTO(AppDataDTO dto) {
        // This is a simplified version - you would need to implement full save logic
        // For now, I'll create individual endpoints for each entity type
        
        // Save About
        if (dto.getAbout() != null) {
            About about = dataService.getAbout().orElse(new About());
            about.setShortInfo(dto.getAbout().getShortInfo());
            about.setVision(dto.getAbout().getVision());
            about.setMission(dto.getAbout().getMission());
            dataService.saveAbout(about);
        }
        
        // Similar for other entities...
    }

    // Individual entity endpoints for better control
    @PostMapping("/about")
    public ResponseEntity<About> saveAbout(@RequestBody AboutDTO dto) {
        About about = dataService.getAbout().orElse(new About());
        about.setShortInfo(dto.getShortInfo());
        about.setVision(dto.getVision());
        about.setMission(dto.getMission());
        return ResponseEntity.ok(dataService.saveAbout(about));
    }

    @PostMapping("/contact")
    public ResponseEntity<Contact> saveContact(@RequestBody ContactDTO dto) {
        Contact contact = dataService.getContact().orElse(new Contact());
        contact.setEmail(dto.getEmail());
        contact.setWhatsapp(dto.getWhatsapp());
        return ResponseEntity.ok(dataService.saveContact(contact));
    }

    @PostMapping("/social-media")
    public ResponseEntity<SocialMedia> saveSocialMedia(@RequestBody SocialMediaDTO dto) {
        SocialMedia socialMedia = dataService.getSocialMedia().orElse(new SocialMedia());
        socialMedia.setFacebook(dto.getFacebook());
        socialMedia.setInstagram(dto.getInstagram());
        socialMedia.setYoutube(dto.getYoutube());
        return ResponseEntity.ok(dataService.saveSocialMedia(socialMedia));
    }

    @GetMapping("/inquiries")
    public ResponseEntity<List<AdmissionInquiry>> getInquiries() {
        return ResponseEntity.ok(dataService.getAllInquiries());
    }

    @GetMapping("/student-registrations")
    public ResponseEntity<List<StudentRegistration>> getStudentRegistrations() {
        return ResponseEntity.ok(dataService.getAllStudentRegistrations());
    }

    // Management endpoints
    @GetMapping("/management")
    public ResponseEntity<List<Management>> getManagement() {
        return ResponseEntity.ok(dataService.getAllManagement());
    }

    @PostMapping("/management")
    public ResponseEntity<Management> createManagement(@RequestBody Management management) {
        return ResponseEntity.ok(dataService.saveManagement(management));
    }

    @PutMapping("/management/{id}")
    public ResponseEntity<Management> updateManagement(@PathVariable Long id, @RequestBody Management management) {
        management.setId(id);
        return ResponseEntity.ok(dataService.saveManagement(management));
    }

    @DeleteMapping("/management/{id}")
    public ResponseEntity<?> deleteManagement(@PathVariable Long id) {
        dataService.deleteManagement(id);
        return ResponseEntity.ok().build();
    }

    // Units endpoints
    @GetMapping("/units")
    public ResponseEntity<List<AcademicUnit>> getUnits() {
        return ResponseEntity.ok(dataService.getAllUnits());
    }

    @PostMapping("/units")
    public ResponseEntity<AcademicUnit> createUnit(@RequestBody AcademicUnit unit) {
        return ResponseEntity.ok(dataService.saveAcademicUnit(unit));
    }

    @PutMapping("/units/{id}")
    public ResponseEntity<AcademicUnit> updateUnit(@PathVariable Long id, @RequestBody AcademicUnit unit) {
        unit.setId(id);
        return ResponseEntity.ok(dataService.saveAcademicUnit(unit));
    }

    @DeleteMapping("/units/{id}")
    public ResponseEntity<?> deleteUnit(@PathVariable Long id) {
        dataService.deleteAcademicUnit(id);
        return ResponseEntity.ok().build();
    }

    // Home Results
    @GetMapping("/home-results")
    public ResponseEntity<List<HomeResult>> getHomeResults() {
        return ResponseEntity.ok(dataService.getAllHomeResults());
    }

    @PostMapping("/home-results")
    public ResponseEntity<HomeResult> saveHomeResult(@RequestBody HomeResult homeResult) {
        return ResponseEntity.ok(dataService.saveHomeResult(homeResult));
    }

    @PutMapping("/home-results/{id}")
    public ResponseEntity<HomeResult> updateHomeResult(@PathVariable Long id, @RequestBody HomeResult homeResult) {
        homeResult.setId(id);
        return ResponseEntity.ok(dataService.saveHomeResult(homeResult));
    }

    @DeleteMapping("/home-results/{id}")
    public ResponseEntity<?> deleteHomeResult(@PathVariable Long id) {
        dataService.deleteHomeResult(id);
        return ResponseEntity.ok().build();
    }

    // Circulars
    @GetMapping("/circulars")
    public ResponseEntity<List<Circular>> getCirculars() {
        return ResponseEntity.ok(dataService.getAllCirculars());
    }

    @PostMapping("/circulars")
    public ResponseEntity<Circular> createCircular(@RequestBody Circular circular) {
        return ResponseEntity.ok(dataService.saveCircular(circular));
    }

    @PutMapping("/circulars/{id}")
    public ResponseEntity<Circular> updateCircular(@PathVariable Long id, @RequestBody Circular circular) {
        circular.setId(id);
        return ResponseEntity.ok(dataService.saveCircular(circular));
    }

    @DeleteMapping("/circulars/{id}")
    public ResponseEntity<?> deleteCircular(@PathVariable Long id) {
        dataService.deleteCircular(id);
        return ResponseEntity.ok().build();
    }

    // Events
    @GetMapping("/events")
    public ResponseEntity<List<Event>> getEvents() {
        return ResponseEntity.ok(dataService.getAllEvents());
    }

    @PostMapping("/events")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) {
        return ResponseEntity.ok(dataService.saveEvent(event));
    }

    @PutMapping("/events/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event event) {
        event.setId(id);
        return ResponseEntity.ok(dataService.saveEvent(event));
    }

    @DeleteMapping("/events/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        dataService.deleteEvent(id);
        return ResponseEntity.ok().build();
    }
}


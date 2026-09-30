//package com.gurukul.service;
//
//import okhttp3.*;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//
//@Service
//public class WhatsAppService {
//
//    @Value("${superfone.api.key}")
//    private String apiKey;
//
//    @Value("${superfone.template.name}")
//    private String templateName;
//
//    @Value("${superfone.pdf.url}")
//    private String pdfUrl;
//
//    private static final String SUPERFONE_URL =
//            "https://prod-api.superfone.co.in/superfone/api/dragonfly/whatsapp/messages";
//
//    private final OkHttpClient client = new OkHttpClient();
//
//    public void sendRegistrationPdf(String mobile) {
//
//        String recipient = "91" + mobile;
//
//        String jsonPayload = """
//        {
//          "components": [
//            {
//              "type": "header",
//              "parameters": [
//                {
//                  "type": "document",
//                  "document": {
//                    "link": "%s"
//                  }
//                }
//              ]
//            },
//            {
//              "type": "button",
//              "sub_type": "quick_reply",
//              "index": "0",
//              "parameters": [
//                {
//                  "type": "payload",
//                  "payload": "CLICKED_MORE_INFO"
//                }
//              ]
//            }
//          ],
//          "language": "mr",
//          "recipient": "%s",
//          "templateName": "%s",
//          "type": "template"
//        }
//        """.formatted(pdfUrl, recipient, templateName);
//
//        RequestBody body = RequestBody.create(
//                jsonPayload,
//                MediaType.parse("application/json")
//        );
//
//        Request request = new Request.Builder()
//                .url(SUPERFONE_URL)
//                .post(body)
//                .addHeader("x-api-key", apiKey)
//                .addHeader("Accept", "application/json")
//                .addHeader("Content-Type", "application/json")
//                .build();
//
//        try (Response response = client.newCall(request).execute()) {
//            System.out.println("WhatsApp API Response: " + response.body().string());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
//}
package com.gurukul.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    @Value("${superfone.api.key}")
    private String apiKey;

    @Value("${superfone.template.name}")
    private String templateName;

    @Value("${superfone.image.url}")
    private String imageUrl;

    private static final String SUPERFONE_URL =
            "https://prod-api.superfone.co.in/superfone/api/dragonfly/whatsapp/messages";

    private final OkHttpClient client = new OkHttpClient();

    public void sendRegistrationPdf(String mobile) {

        String recipient = "91" + mobile;

        String jsonPayload = """
        {
          "components": [
            {
              "type": "header",
              "parameters": [
                {
                  "type": "image",
                  "image": {
                    "link": "%s"
                  }
                }
              ]
            },
            {
              "type": "button",
              "sub_type": "quick_reply",
              "index": "0",
              "parameters": [
                {
                  "type": "payload",
                  "payload": "CLICKED_MORE_INFO"
                }
              ]
            }
          ],
          "language": "mr",
          "recipient": "%s",
          "templateName": "%s",
          "type": "template"
        }
        """.formatted(imageUrl, recipient, templateName);

        RequestBody body = RequestBody.create(
                jsonPayload,
                MediaType.parse("application/json")
        );

        Request request = new Request.Builder()
                .url(SUPERFONE_URL)
                .post(body)
                .addHeader("x-api-key", apiKey)
                .addHeader("Accept", "application/json")
                .addHeader("Content-Type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (response.body() != null) {
                System.out.println("WhatsApp API Response: " + response.body().string());
            } else {
                System.out.println("WhatsApp API Response: (no body), code=" + response.code());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

package com.gurukul.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class FlexibleIntegerDeserializer extends JsonDeserializer<Integer> {
    @Override
    public Integer deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonToken currentToken = p.getCurrentToken();
        
        // Handle null values
        if (currentToken == JsonToken.VALUE_NULL) {
            return null;
        }
        
        // If it's a number, parse it as Integer
        if (currentToken.isNumeric()) {
            return p.getIntValue();
        }
        
        // If it's a string, try to parse it
        if (currentToken == JsonToken.VALUE_STRING) {
            String value = p.getText();
            if (value == null || value.isEmpty() || value.trim().isEmpty()) {
                return null;
            }
            // Try to parse as Integer
            try {
                return Integer.parseInt(value.trim());
            } catch (NumberFormatException e) {
                return null;
            }
        }
        
        return null;
    }
}


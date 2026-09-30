package com.gurukul.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import java.io.IOException;

public class FlexibleLongDeserializer extends JsonDeserializer<Long> {
    @Override
    public Long deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        JsonToken currentToken = p.getCurrentToken();
        
        // Handle null values
        if (currentToken == JsonToken.VALUE_NULL) {
            return null;
        }
        
        // If it's a number, parse it as Long
        if (currentToken.isNumeric()) {
            return p.getLongValue();
        }
        
        // If it's a string, try to parse it
        if (currentToken == JsonToken.VALUE_STRING) {
            String value = p.getText();
            if (value == null || value.isEmpty() || value.trim().isEmpty()) {
                return null;
            }
            // Try to parse as Long
            try {
                return Long.parseLong(value);
            } catch (NumberFormatException e) {
                // If it's not a valid number (like "new-unit-123"), return null to indicate it's a new entity
                return null;
            }
        }
        
        return null;
    }
}


package com.example.demo.util;

import java.io.IOException;

import com.example.Entity.User.Role;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class RoleDeserializer extends JsonDeserializer<Role> {
    @Override
    public Role deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
//        String role = p.getText().toUpperCase(); // Convert the input string to uppercase
//        return Role.valueOf(role); // Convert the string to the corresponding enum value
        int roleValue = p.getIntValue();  // Get the integer value from the JSON (0 or 1)
        return Role.fromInt(roleValue);
    }
}

package org.example.commonutils.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class JsonUtils {

    private static final ObjectMapper mapper = new ObjectMapper();

    public static String toJson(Object o){
        try {
            return mapper.writeValueAsString(o);
        }catch (JsonProcessingException e){
            throw new RuntimeException("Json convert error",e);
        }
    }
    public static <T> List<T> jsonToList(String json, Class<T> clazz) {
        try {
            if (json == null || json.isEmpty() || json.equals("null")) {
                return Collections.emptyList();
            }

            return mapper.readValue(json,
                                    mapper.getTypeFactory().constructCollectionType(List.class, clazz)
                                   );

        } catch (Exception e) {
            throw new RuntimeException("Cannot convert JSON to List: " + e.getMessage(), e);
        }
    }

}

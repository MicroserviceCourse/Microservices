package org.example.commonutils.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

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
}

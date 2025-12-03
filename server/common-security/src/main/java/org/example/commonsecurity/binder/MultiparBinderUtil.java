package org.example.commonsecurity.binder;

import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.multipart.MultipartFile;

import java.beans.PropertyEditorSupport;
import java.lang.reflect.Field;
import java.util.List;

@ControllerAdvice
public class MultiparBinderUtil {
    @InitBinder
    public void initBinder(WebDataBinder binder) {

        binder.registerCustomEditor(
                MultipartFile.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text == null || text.isEmpty()) {
                    setValue(null);
                } else {
                    super.setAsText(text);
                }
            }
        });

        // Fix cho List<MultipartFile> (gallery="", variantImages="")
        binder.registerCustomEditor(List.class, new PropertyEditorSupport() {
            @Override
            public void setAsText(String text) {
                if (text == null || text.isEmpty()) {
                    setValue(null);
                } else {
                    super.setAsText(text);
                }
            }
        });
    }
}

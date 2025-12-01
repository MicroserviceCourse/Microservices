package org.example.commonutils.util;

import org.springframework.core.io.ByteArrayResource;

public class MultipartInputStreamFileResource  extends ByteArrayResource {
    private final String filename;

    public MultipartInputStreamFileResource(byte[] bytes, String filename) {
        super(bytes);
        this.filename = filename;
    }

    @Override
    public String getFilename() {
        return filename;
    }

    @Override
    public long contentLength() {
        return this.getByteArray().length;
    }
}

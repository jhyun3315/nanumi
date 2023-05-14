package com.ssafy.nanumi.common;

public enum Image {
    DefaultImage("https://i.pinimg.com/originals/74/22/d8/7422d87eb352c30d8a4b2b1c783a19af.jpg");

    private final String imageUrl;

    Image(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getValue() {
        return this.imageUrl;
    }
}

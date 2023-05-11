package com.ssafy.nanumi.common.provider;

public enum Provider {
    local("local"),
    kakao("kakao");

    private final String provider;
    Provider(String provider){
        this.provider = provider;
    }

    public String getValue() {
        return this.provider;
    }

}

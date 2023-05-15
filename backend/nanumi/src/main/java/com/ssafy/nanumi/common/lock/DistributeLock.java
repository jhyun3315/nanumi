package com.ssafy.nanumi.common.lock;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.concurrent.TimeUnit;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
/* 커스텀 인터 페이스 */
public @interface DistributeLock {
    String key(); // 락 이름
    TimeUnit timeUnit() default TimeUnit.SECONDS; // 시간 단위
    long waitTime() default 5L; // 락 획득 대기 시간
    long leaseTime() default 3L; // 락 임대 시간
}

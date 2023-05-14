package com.ssafy.nanumi;
import com.ssafy.nanumi.api.service.NanumService;
import com.ssafy.nanumi.db.entity.*;
import com.ssafy.nanumi.db.repository.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@DisplayName("Lock 테스트")
@SpringBootTest
public class NanumTest {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private LoginProviderRepository loginProviderRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductImageRepository productImageRepository;
    @Autowired
    private NanumService nanumService;
    @Autowired
    private MatchRepository matchRepository;

    @Test
    void dongsi() throws InterruptedException {
        Category category = Category.builder()
                .name("디지털")
                .build();
        categoryRepository.save(category);
        UserInfo userInfo = UserInfo.builder().build();
        userInfoRepository.save(userInfo);
        Address address = Address.builder()
                .si("서울시")
                .guGun("중구")
                .dong("효창동")
                .build();
        addressRepository.save(address);
        LoginProvider loginProvider = LoginProvider.builder()
                .provider(LoginProvider.Provider.APPLE)
                .build();
        loginProviderRepository.save(loginProvider);
        User user1 = User.builder()
                .email("1so992419@naver.com")
                .nickname("유저1")
                .profileUrl("")
                .password("123")
                .address(address)
                .userInfo(userInfo)
                .loginProvider(loginProvider)
                .build();
        userRepository.save(user1);
        User user2 = User.builder()
                .email("2so992419@naver.com")
                .nickname("유저2")
                .profileUrl("")
                .password("123")
                .address(address)
                .userInfo(userInfo)
                .loginProvider(loginProvider)
                .build();
        userRepository.save(user2);
        User user3 = User.builder()
                .email("3so992419@naver.com")
                .nickname("유저3")
                .profileUrl("")
                .password("123")
                .address(address)
                .userInfo(userInfo)
                .loginProvider(loginProvider)
                .build();
        userRepository.save(user3);
        Product product = Product.builder()
                .name("나눔")
                .content("가져가세요")
                .category(category)
                .user(user1)
                .build();
        Product createProduct = productRepository.save(product);

        Long productId = createProduct.getId();

        ProductImage productImage = ProductImage.builder()
                .product(createProduct)
                .imageUrl("url")
                .build();
        productImageRepository.save(productImage);

        int numberOfThreads = 10;
        ExecutorService executorService = Executors.newFixedThreadPool(32);
        CountDownLatch latch = new CountDownLatch(numberOfThreads);

        for (int i=0; i<numberOfThreads; i++) {
            executorService.submit(() -> {
                try {
//                    nanumService.registerNanum(productId,user1);
//                    nanumService.registerNanum(productId,user2);
                    nanumService.registerNanum(productId,user3);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                } finally {
                    latch.countDown();
                }
            });
        }
        latch.await();
        Long totalCount = matchRepository.count();
        Assertions.assertThat(totalCount).isEqualTo(3L); // 3L 아닐시 오류 생성
    }
}

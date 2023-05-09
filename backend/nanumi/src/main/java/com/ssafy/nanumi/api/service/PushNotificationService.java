package com.ssafy.nanumi.api.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.nanumi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PushNotificationService {
    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;


    public void sendPushNotification(String targetToken, String title, String body) {

        // TODO 변경 되어야함
        //Optional<User> user = userRepository.findByEmail(String.valueOf(notificationDTO.getTargetUserId()));


        Notification notification = Notification.builder()
                .setTitle(title)
                .setBody(body)
                .build();

        Message message = Message.builder()
                .setNotification(notification)
                .setToken(targetToken)
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Sent message: " + response);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
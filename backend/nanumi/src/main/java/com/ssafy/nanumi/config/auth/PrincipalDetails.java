package com.ssafy.nanumi.config.auth;

import com.ssafy.nanumi.db.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@NoArgsConstructor
public class PrincipalDetails implements UserDetails {
    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    // 해당 user의 권한을 리턴 하는 곳.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<GrantedAuthority>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return user.getUserInfo().getTier();
            }
        });
        return collection;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}

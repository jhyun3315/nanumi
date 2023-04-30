package com.ssafy.nanumi.config.auth;

import com.ssafy.nanumi.db.entity.User;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

public class PrincipalDetails implements UserDetails {

    private Optional<User> user;

    public PrincipalDetails(Optional<User> user) {this.user=user;}

    public Optional<User> getUser() { return user; }

    @Override
    public String getPassword() {
        return user.get().getPassword();
    }

    @Override
    public String getUsername() {
        return user.get().getEmail();
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        user.get().getRoleList().forEach(r -> {
            authorities.add(()->{ return r;});
        });
        return authorities;
    }

}

package com.example.board.dto;

public class UserResponse {
    private Long id;
    private String email;
    private String username;
    private String avatarUrl;

    public UserResponse(Long id, String email, String username, String avatarUrl) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.avatarUrl = avatarUrl;
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getUsername() { return username; }
    public String getAvatarUrl() { return avatarUrl; }
}

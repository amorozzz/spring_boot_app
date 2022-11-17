package dev.amorozzz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping()
public class UserController {
    @GetMapping("/admin")
    public String adminPanel() {
        return "admin/index";
    }

    @GetMapping("user")
    public String userPanel() {
        return "user/index";
    }
}

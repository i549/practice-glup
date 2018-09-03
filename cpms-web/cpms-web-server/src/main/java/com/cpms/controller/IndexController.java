package com.cpms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/index")
public class IndexController {

    @GetMapping(value = "/main")
    public String indexMain() {
        return "hello main page.";
    }
}

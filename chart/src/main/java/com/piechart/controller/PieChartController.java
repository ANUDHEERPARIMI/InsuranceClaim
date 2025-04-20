package com.piechart.controller;


import com.piechart.service.PieChartService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/claims")
@CrossOrigin(origins = "http://localhost:5173") 
public class PieChartController {

    @Autowired
    private PieChartService claimFormService;

    @GetMapping("/count/on-hold")
    public long getOnHoldCount() {
        return claimFormService.getOnHoldCount();
    }

    @GetMapping("/count/accepted")
    public long getAcceptedCount() {
        return claimFormService.getAcceptedCount();
    }

    @GetMapping("/count/not-accepted")
    public long getNotAcceptedCount() {
        return claimFormService.getNotAcceptedCount();
    }
    @GetMapping("/count")
    public Map<String, Long> getClaimCounts() {
        Map<String, Long> claimCounts = new HashMap<>();
        claimCounts.put("onHold", claimFormService.getOnHoldCount());
        claimCounts.put("accepted", claimFormService.getAcceptedCount());
        claimCounts.put("notAccepted", claimFormService.getNotAcceptedCount());
        return claimCounts;
    }

}

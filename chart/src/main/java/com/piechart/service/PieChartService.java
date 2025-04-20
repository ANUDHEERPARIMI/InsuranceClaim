package com.piechart.service;

import com.piechart.repository.PiechartRepository;
import com.piechart.entity.ClaimStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PieChartService {

    @Autowired
    private PiechartRepository claimFormRepository;

    public long getCountByStatus(ClaimStatus status) {
        return claimFormRepository.countByStatus(status);
    }

    public long getOnHoldCount() {
        return getCountByStatus(ClaimStatus.ON_HOLD);
    }

    public long getAcceptedCount() {
        return getCountByStatus(ClaimStatus.ACCEPTED);
    }

    public long getNotAcceptedCount() {
        return getCountByStatus(ClaimStatus.NOT_ACCEPTED);
    }
}

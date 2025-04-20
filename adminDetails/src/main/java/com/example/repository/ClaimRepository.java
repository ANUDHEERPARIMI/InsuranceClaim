package com.example.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.model.Claim;

@Repository
public interface ClaimRepository  extends CrudRepository<Claim,Integer>{

}

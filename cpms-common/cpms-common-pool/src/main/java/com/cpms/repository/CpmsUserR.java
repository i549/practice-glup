package com.cpms.repository;

import com.cpms.model.CpmsUserT;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.criteria.CriteriaBuilder;

/**
 * Created by jiangdejun on 2018/9/5.
 */
public interface CpmsUserR extends JpaRepository<CpmsUserT, Integer> {
}

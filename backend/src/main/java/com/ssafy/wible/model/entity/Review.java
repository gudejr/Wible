package com.ssafy.wible.model.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.ssafy.wible.model.response.user.ReviewResponse;
import com.ssafy.wible.model.response.user.UserResponse;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "review")
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int reviewSeq;
	@Column
	private int userSeq;
	@Column
	private int wineSeq;
	@Column
	private String reviewText;
	@Column
	private double reviewScore;
	@Column
	private LocalDateTime registerDate;
	
}

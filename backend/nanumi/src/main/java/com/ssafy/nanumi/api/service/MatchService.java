package com.ssafy.nanumi.api.service;

import com.ssafy.nanumi.api.response.MatchInterface;
import com.ssafy.nanumi.api.response.MatchResDTO;
import com.ssafy.nanumi.config.response.exception.CustomException;
import com.ssafy.nanumi.db.entity.Product;
import com.ssafy.nanumi.db.repository.MatchRepository;
import com.ssafy.nanumi.db.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.nanumi.config.response.exception.CustomExceptionStatus.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchService {

    private final MatchRepository matchRepository;
    private final ProductRepository productRepository;

    public List<MatchResDTO> getMatchList(long product_id){

        if(productRepository.findById(product_id).isEmpty()){
            throw new CustomException(NOT_FOUND_MATCH);
        }else {
            ArrayList<MatchInterface> lst = matchRepository.getMatchListByProduct(product_id);
            List<MatchResDTO> result = new ArrayList<>();

            for(MatchInterface match : lst){
                System.out.println(match.getUserId());
                result.add(new MatchResDTO(match.getUserId(), match.getProfileUrl(), match.getProductId(), match.getMatchId(), match.getCreateDate()));
            }
            return result;
        }
    }
}

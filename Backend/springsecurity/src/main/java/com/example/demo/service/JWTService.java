//package com.example.demo.service;
//
//import java.awt.RenderingHints.Key;
//import java.security.NoSuchAlgorithmException;
//import java.sql.Date;
//import java.util.Base64;
//import java.util.HashMap;
//import java.util.Map;
//
//import javax.crypto.KeyGenerator;
//import javax.crypto.SecretKey;
//
//import org.springframework.stereotype.Service;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.io.Decoders;
//import io.jsonwebtoken.security.Keys;
//
//@Service
//public class JWTService {
//	private String secretKey="";
//	public JWTService() {
//		try {
//			KeyGenerator keyGen =KeyGenerator.getInstance("HmacSHA256");
//			SecretKey sk=keyGen.generateKey();
//			secretKey=Base64.getEncoder().encodeToString(sk.getEncoded());
//			
//		}catch(NoSuchAlgorithmException e) {
//			throw new RuntimeException(e);
//		}
//	}
////	public String generateToken(String username) {
////		Map<String,Object> claims=new HashMap<>();
////		
////		return Jwts.builder()
////				.setclaims()
////				.add(claims)
////				.subject(username)
////				.issuedAt(new Date(System.currentTimeMillis()))
////				.expiration(new Date(System.currentTimeMillis()*60 * 60 * 30))
////				.and()
////				.signWith(getKey())
////				.compact();
////		
////	}
//	public String generateToken(String username) {
//	    Map<String, Object> claims = new HashMap<>();
//	    
//	    // You can add claims to the map here if necessary, for example:
//	    claims.put("role", "user");
//
//	    return Jwts.builder()
//	            .setClaims(claims)  // Use setClaims to add the claims map
//	            .setSubject(username)
//	            .setIssuedAt(new Date(System.currentTimeMillis()))
//	            .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 30 * 1000))  // Correct expiration time
//	            .signWith(getKey())
//	            .compact();
//	}
//	
//	private Key getKey() {
//		byte[] keyBytes=Decoders.BASE64.decode(secretKey);
//		return Keys.hmacShaKeyFor(keyBytes);
//	}
//
//}

package com.example.demo.service;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    private String secretKey = "";

    public JWTService() {
        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            secretKey = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        
        // You can add claims to the map here if necessary
        claims.put("role", "user");

        return Jwts.builder()
                .setClaims(claims)  // Set claims map
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 30 * 1000))  // Correct expiration time
                .signWith(getKey())  // Use the correct key
                .compact();
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);  // Returns a valid SecretKey
    }
    public String extractUserName(String token) {
    	return extractClaim(token,Claims::getSubject);
    }
    private <T> T extractClaim(String token,Function<Claims,T> claimResolver) {
       final Claims claims =extractAllClaims(token);
       return claimResolver.apply(claims);
    }
//    private Claims extractAllClaims(String token) {
//    	return Jwts.parser()
//    			.verifyWith(getKey())
//    			.build().parseSignedClaims(token).getPayload();
//    }
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    public boolean validateToken(String token,UserDetails userDetails) {
    final String userName=extractUserName(token);
    return (userName.equals(userDetails.getUsername())&&!isTokenExpired(token));
    
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
//    private SecretKey getKey() {
//        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
//        return Keys.hmacShaKeyFor(keyBytes);
      
    
}


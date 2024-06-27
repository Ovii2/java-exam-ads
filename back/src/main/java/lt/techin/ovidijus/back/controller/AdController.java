package lt.techin.ovidijus.back.controller;

import lt.techin.ovidijus.back.dto.AdDTO;
import lt.techin.ovidijus.back.exceptions.AdNotFoundException;
import lt.techin.ovidijus.back.exceptions.CategoryNotFoundException;
import lt.techin.ovidijus.back.exceptions.NotAdminException;
import lt.techin.ovidijus.back.model.Ad;
import lt.techin.ovidijus.back.service.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/ads")
public class AdController {

    private AdService adService;

    @Autowired
    public AdController(AdService adService) {
        this.adService = adService;
    }

    @GetMapping
    public ResponseEntity<List<Ad>> getAllAds() {
        List<Ad> ads = adService.getAllAds();
        return new ResponseEntity<>(ads, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ad> getOneBook(@PathVariable long id) {
        Optional<Ad> ad = adService.getOneAd(id);
        return ad.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Ad> addAd(@RequestBody AdDTO adDTO) throws NotAdminException, CategoryNotFoundException {
        Ad newBook = adService.addAd(adDTO);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteAd(@PathVariable long id) throws NotAdminException, AdNotFoundException {
        adService.deleteAd(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Ad> updateBook(@PathVariable long id, @RequestBody AdDTO ad) {
        try {
            Ad updatedAd = adService.updateAd(id, ad);
            return new ResponseEntity<>(updatedAd, HttpStatus.OK);
        } catch (AdNotFoundException | NotAdminException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (CategoryNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
}

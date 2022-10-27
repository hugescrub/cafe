package hugescrub.cafe.menu.mock;

import com.fasterxml.jackson.databind.ObjectMapper;
import hugescrub.cafe.menu.dto.ItemDto;
import hugescrub.cafe.menu.models.EItem;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.Timed;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
@AutoConfigureMockMvc
class ItemControllerTest {

    private final MockMvc mvc;

    @Autowired
    public ItemControllerTest(MockMvc mvc) {
        this.mvc = mvc;
    }

    @Test
    @Timed(millis = 5000)
    public void getItemsTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/items/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*]").isNotEmpty());
    }

    @Test
    public void getItemByIdTest() throws Exception {
        mvc.perform(MockMvcRequestBuilders
                        .get("/items?id=1")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1));
    }

    @Test
    @Transactional
    public void addValidItemTest() throws Exception {
        ItemDto item = new ItemDto(
                "MockItem",
                100.99, EItem.CLASSIC,
                "Some Description",
                null
        );

        mvc.perform(MockMvcRequestBuilders
                .post("/items/add")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(item))
                .header("Authorization", "Basic " +
                        Base64.getEncoder().encodeToString("username:password".getBytes())))
                .andExpect(status().isOk());
    }

    @Test
    @Transactional
    public void addInvalidItemTest() throws Exception {
        ItemDto item = new ItemDto(
                "MockItem",
                -100.99, EItem.CLASSIC,
                "Some Description",
                null
        );

        mvc.perform(MockMvcRequestBuilders
                .post("/items/add")
                .accept(MediaType.APPLICATION_JSON)
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(item))
                .header("Authorization", "Basic " +
                        Base64.getEncoder().encodeToString("username:password".getBytes())))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void getItemsByTypeTest() throws Exception {
        String type = "classic";
        mvc.perform(MockMvcRequestBuilders
                .get("/items/" + type)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.[*]").isNotEmpty());
    }

    @Test
    public void getItemsByWrongTypeTest() throws Exception {
        String type = "randStr";
        mvc.perform(MockMvcRequestBuilders
                        .get("/items/" + type)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Illegal item type."));
    }

    @Test
    @Transactional
    public void removeItemByNegativeIdTest() throws Exception {
        long id = -10L;
        mvc.perform(MockMvcRequestBuilders
                .delete("/items/remove/" + id)
                .accept(MediaType.APPLICATION_JSON)
                .header("Authorization", "Basic " +
                        Base64.getEncoder().encodeToString("username:password".getBytes())))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
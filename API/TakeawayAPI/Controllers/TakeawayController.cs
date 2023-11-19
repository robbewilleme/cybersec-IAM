using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TakeawayAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TakeawayController : ControllerBase
    {
        [Authorize]
        [HttpGet("orders")]
        public ActionResult<IEnumerable<Order>> GetOrders()
        {
            var orders = new List<Order>
            {
                new Order { Id = 1, Name = "Burger", Price = 5.00, Description = "Klassieke hamburger op grootmoeders wijze" },
                new Order { Id = 1, Name = "Pizza", Price = 10.00, Description = "pizza margheritta" }
            };

            return Ok(orders);
        }
    }

    public class Order
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; } 
    }
}

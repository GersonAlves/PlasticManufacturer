using PlasticManufacturer.Domain.Entities.ShippingMethods;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerShipViaAccount : Entity
    {
        [ForeignKey("ShippingMethod")]
        public int? ShippingMethod_Id { get; set; }
        public ShippingMethod ShippingMethod { get; set; }
    }
}
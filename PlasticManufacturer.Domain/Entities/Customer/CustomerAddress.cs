using PlasticManufacturer.Domain.Entities.Adresses;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerAddress : Entity
    {
        [ForeignKey("AddressType")]
        public int? AddressType_Id { get; set; }
        public virtual AddressType AddressType { get; set; }

        public string Street { get; set; }
        public string Complement { get; set; }

        [ForeignKey("State")]
        public int? State_Id { get; set; }
        public virtual State State { get; set; }

        [ForeignKey("City")]
        public int? City_Id { get; set; }
        public virtual City City { get; set; }

        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
    }
}
        
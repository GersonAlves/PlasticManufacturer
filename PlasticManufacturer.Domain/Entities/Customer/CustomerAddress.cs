using PlasticManufacturer.Domain.Entities.Adresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerAddress : Entity
    {
        public virtual AddressType AddressType { get; set; }
        public string Street { get; set; }
        public string Complement { get; set; }
        public virtual State State { get; set; }
        public virtual City City { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
    }
}
        
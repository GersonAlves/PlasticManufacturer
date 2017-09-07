using PlasticManufacturer.Domain.Entities.Adresses;
using PlasticManufacturer.Domain.Entities.Employees;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class Customer:Entity    
    {
        public virtual string LastName { get; set; }

        public virtual string Code { get; set; }

        public virtual CustomerRating Rating { get; }

        public virtual CustomerStatus Status { get; }

        public virtual bool Prospect { get; set; }

        public virtual bool Lead { get; set; }

        public virtual Employee SalesRepresentant { get; set; }

        public virtual Employee AuthorizedBy { get; set; }

        public virtual CustomerContacted ContactedBy { get; set; }

        public virtual int FedId { get; set; }

        public virtual IList<CustomerAddress> Addresses { get; set; }

        public virtual CustomerDefault CustomerDefaults { get; set; }

        public virtual IList<CustomerShipViaAccount> ShipViaAccounts { get; set; }

        public virtual string Notes { get; set; }

    }
}

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
    public class Customer : Entity
    {
        public virtual string LastName { get; set; }

        public virtual string Code { get; set; }

        [ForeignKey("Rating")]
        public int? Rating_Id { get; set; }
        public virtual CustomerRating Rating { get; private set; }

        [ForeignKey("Status")]
        public int? Status_Id { get; set; }
        public virtual CustomerStatus Status { get; private set; }


        public virtual bool Prospect { get; set; }

        public virtual bool Lead { get; set; }

        [ForeignKey("SalesRepresentant")]
        public int? SalesRepresentant_Id { get; set; }
        public virtual Employee SalesRepresentant { get; private set; }

        [ForeignKey("AuthorizedBy")]
        public int? AuthorizedBy_Id { get; set; }
        public virtual Employee AuthorizedBy { get; private set; }

        [ForeignKey("ContactedBy")]
        public int? ContactedBy_Id { get; set; }
        public virtual CustomerContacted ContactedBy { get; private set; }

        public virtual int FedId { get; set; }

        public virtual IList<CustomerAddress> Addresses { get; private set; }

        [ForeignKey("CustomerDefaults")]
        public int? CustomerDefaults_Id { get; set; }
        public virtual CustomerDefault CustomerDefaults { get; private set; }

        public virtual IList<CustomerShipViaAccount> ShipViaAccounts { get; private set; }

        public virtual string Notes { get; set; }

    }
}

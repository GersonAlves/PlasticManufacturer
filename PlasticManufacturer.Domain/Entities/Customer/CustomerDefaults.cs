using PlasticManufacturer.Domain.Entities.Common;
using System.ComponentModel.DataAnnotations.Schema;

namespace PlasticManufacturer.Domain.Entities.Customers
{
    public class CustomerDefault : Entity
    {
        [ForeignKey("Freight")]
        public int? Freight_Id { get; set; }
        public virtual Freight Freight { get; set; }

        public string FreightDescription { get; set; }
        public bool? MailingList { get; set; }
        public bool? MutipleSites { get; set; }
        public string Reference { get; set; }

        //public virtual bool StandardTerms { get; set; }
        //public virtual bool Cod { get; set; }
        //public virtual bool PrePaid { get; set; }

        [ForeignKey("SecondLabel")]
        public int? SecondLabel_Id { get; set; }
        public virtual SecondLabel SecondLabel { get; set; }

        public string Note { get; set; }

    }
}
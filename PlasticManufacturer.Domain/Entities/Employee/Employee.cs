using PlasticManufacturer.Domain.Entities.Adresses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Employees
{
    public class Employee : Entity
    {
        public virtual string Email { get; set; }
        public virtual bool Status { get; set; }
        public virtual string LastName { get; set; }
        public virtual DateTime? Birthday { get; set; }
        public virtual Gender  Gender { get; set; }
        public virtual MaritalStatus MaritalStatus { get; set; }
        public virtual string Address { get; set; }
        public virtual City City { get; set; }
        public virtual State State { get; set; }
        public virtual string ZipCode { get; set; }
        public virtual string Telephone { get; set; }
        public virtual string Ss { get; set; }
        public virtual DateTime HireDate { get; set; }
        public virtual Title Title { get; set; }
        public virtual Department Department { get; set; }



    }
}

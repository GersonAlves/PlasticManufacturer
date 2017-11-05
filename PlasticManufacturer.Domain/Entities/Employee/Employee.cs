using PlasticManufacturer.Domain.Entities.Adresses;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.Domain.Entities.Employees
{
    public class Employee : Entity
    {
        public virtual string Email { get; set; }
        public virtual bool? Status { get; set; }
        public virtual string LastName { get; set; }
        public virtual DateTime? Birthday { get; set; }

        [ForeignKey("Gender")]
        public int? Gender_Id { get; set; }
        public virtual Gender  Gender { get; private set; }

        [ForeignKey("MaritalStatus")]
        public int? MaritalStatus_Id { get; set; }
        public virtual MaritalStatus MaritalStatus { get; private set; }

        public virtual string Address { get; set; }

        [ForeignKey("City")]
        public int? City_Id { get; set; }
        public virtual City City { get; private set; }

        [ForeignKey("State")]
        public int? State_Id { get; set; }
        public virtual State State { get; private set; }

        public virtual string ZipCode { get; set; }
        public virtual string Telephone { get; set; }
        public virtual string Ss { get; set; }
        public virtual DateTime? HireDate { get; set; }

        [ForeignKey("Title")]
        public int? Title_Id { get; set; }
        public virtual Title Title { get; private set; }

        [ForeignKey("Department")]
        public int? Department_Id { get; set; }
        public virtual Department Department { get; private set; }



    }
}

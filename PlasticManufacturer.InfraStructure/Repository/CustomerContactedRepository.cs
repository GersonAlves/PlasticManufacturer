using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class CustomerContactedRepository : IRepository<CustomerContacted>
    {
        public void Add(CustomerContacted entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersContacted.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(CustomerContacted entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersContacted.Remove(entity);
                context.SaveChanges();
            }
        }

        public void Dispose()
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Dispose();
            }
        }

        public IList<CustomerContacted> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersContacted.ToList();
            }
        }

        public CustomerContacted GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersContacted.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void Update(CustomerContacted entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersContacted.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

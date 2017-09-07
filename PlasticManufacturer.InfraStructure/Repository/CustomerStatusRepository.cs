using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class CustomerStatusRepositoryv : IRepository<CustomerStatus>
    {
        public void Add(CustomerStatus entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersStatus.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(CustomerStatus entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersStatus.Remove(entity);
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

        public IList<CustomerStatus> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersStatus.ToList();
            }
        }

        public CustomerStatus GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersStatus.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void Update(CustomerStatus entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersStatus.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

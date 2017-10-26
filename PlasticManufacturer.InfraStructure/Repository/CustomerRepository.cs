using PlasticManufacturer.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.InfraStructure.Context;
using System.Data.Entity;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        public void Add(Customer entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Customers.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(Customer entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Customers.Remove(entity);
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

        public IList<Customer> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {

               return context.Customers
                            .Include(x => x.ShipViaAccounts)
                            .Include(x => x.CustomerDefaults)
                            .Include(x => x.Addresses)
                            .Include(x => x.Status).ToList();
                //return context.Customers
                //    .Include("CustomerAddresses")
                //    .Include("CustomersContacted")
                //    .Include("CustomerDefaults")
                //    .Include("CustomersRating")
                //    .Include("CustomerShipViaAccounts")
                //    .Include("CustomersStatus")
                //    .Include("SecondLabels").ToList();
            }
        }

        public Customer GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.Customers
                    .Include("CustomerAddresses")
                    .Include("CustomersContacted")
                    .Include("CustomerDefaults")
                    .Include("CustomersRating")
                    .Include("CustomerShipViaAccounts")
                    .Include("CustomersStatus")
                    .Include("SecondLabels").FirstOrDefault(w => w.Id ==id);

            }
        }

        public void Update(Customer entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Customers.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

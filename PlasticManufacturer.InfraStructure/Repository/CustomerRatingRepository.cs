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
    public class CustomerRatingRepository : IRepository<CustomerRating>
    {
        public void Add(CustomerRating entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersRating.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(CustomerRating entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersRating.Remove(entity);
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

        public IList<CustomerRating> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersRating.ToList();
            }
        }

        public CustomerRating GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.CustomersRating.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void Update(CustomerRating entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.CustomersRating.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

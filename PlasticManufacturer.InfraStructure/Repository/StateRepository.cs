using PlasticManufacturer.Domain.Entities.Adresses;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlasticManufacturer.InfraStructure.Repository
{
    public class StateRepository : IRepository<State>
    {
        public void Add(State entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.States.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(State entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.States.Remove(entity);
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

        public IList<State> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.States.Include("Cities").ToList() ;
            }
        }

        public State GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.States.Include("Cities").Where(x => x.Id == id).FirstOrDefault() ;
            }
        }

        public void Update(State entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.States.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

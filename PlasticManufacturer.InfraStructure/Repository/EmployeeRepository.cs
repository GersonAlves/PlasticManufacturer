﻿using PlasticManufacturer.Domain.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PlasticManufacturer.Domain.Entities.Employees;
using PlasticManufacturer.InfraStructure.Context;
using System.Data.Entity;


namespace PlasticManufacturer.InfraStructure.Repository
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public void Add(Employee entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Employees.Add(entity);
                context.SaveChanges();
            }
        }

        public void Delete(Employee entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Employees.Remove(entity);
                context.SaveChanges();
            }
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public IList<Employee> GetAll()
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.Employees
                    .Include(x => x.Department)
                    .Include(x => x.City)
                    .Include(x => x.Gender)
                    .Include(x => x.MaritalStatus)
                    .Include(x => x.State.Cities)
                    .Include(x => x.Title).ToList();
            }
        }

        public Employee GetById(int id)
        {
            using (var context = new PlasticManufacturerContext())
            {
                return context.Employees.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        public void Update(Employee entity)
        {
            using (var context = new PlasticManufacturerContext())
            {
                context.Employees.Add(entity);
                context.SaveChanges();
            }
        }
    }
}

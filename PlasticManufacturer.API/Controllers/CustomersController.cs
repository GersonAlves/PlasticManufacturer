using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.InfraStructure.Context;
using System.Web.Http.Cors;
using PlasticManufacturer.Domain.Repository;
using PlasticManufacturer.InfraStructure.Repository;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    [Serializable]
    public class CustomersController : ApiController
    {
        IRepository<Customer> repository;

        public CustomersController()
        {
            repository = new CustomerRepository();
        }

        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Customers
        public IEnumerable<Customer> GetCustomers()
        {
            var Customers = repository.GetAll();
             return Customers;
        }

        // GET: api/Customers/5
        [ResponseType(typeof(Customer))]
        public Customer GetCustomer(int id)
        {
            

            Customer customer = repository.GetById(id);
               return customer;
        }

        // PUT: api/Customers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCustomer(int id, Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Id)
            {
                return BadRequest();
            }

            customer.LastUpdate = DateTime.UtcNow;


            db.Entry(customer).State = EntityState.Modified;
            db.Entry(customer.CustomerDefault).State = EntityState.Modified;

            try
            {

                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Customers
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> PostCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            customer.CreationDate = DateTime.UtcNow;
            customer.LastUpdate = DateTime.UtcNow;

            db.Customers.Add(customer);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> DeleteCustomer(int id)
        {
            Customer customer = await db.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);
            await db.SaveChangesAsync();

            return Ok(customer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            return db.Customers.Count(e => e.Id == id) > 0;
        }
    }
}
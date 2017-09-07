using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PlasticManufacturer.Domain.Entities.Customers;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class CustomerContactedsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/CustomerContacteds
        public IQueryable<CustomerContacted> GetCustomersContacted()
        {
            return db.CustomersContacted;
        }

        // GET: api/CustomerContacteds/5
        [ResponseType(typeof(CustomerContacted))]
        public IHttpActionResult GetCustomerContacted(int id)
        {
            CustomerContacted customerContacted = db.CustomersContacted.Find(id);
            if (customerContacted == null)
            {
                return NotFound();
            }

            return Ok(customerContacted);
        }

        // PUT: api/CustomerContacteds/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomerContacted(int id, CustomerContacted customerContacted)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerContacted.Id)
            {
                return BadRequest();
            }

            db.Entry(customerContacted).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerContactedExists(id))
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

        // POST: api/CustomerContacteds
        [ResponseType(typeof(CustomerContacted))]
        public IHttpActionResult PostCustomerContacted(CustomerContacted customerContacted)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomersContacted.Add(customerContacted);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customerContacted.Id }, customerContacted);
        }

        // DELETE: api/CustomerContacteds/5
        [ResponseType(typeof(CustomerContacted))]
        public IHttpActionResult DeleteCustomerContacted(int id)
        {
            CustomerContacted customerContacted = db.CustomersContacted.Find(id);
            if (customerContacted == null)
            {
                return NotFound();
            }

            db.CustomersContacted.Remove(customerContacted);
            db.SaveChanges();

            return Ok(customerContacted);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerContactedExists(int id)
        {
            return db.CustomersContacted.Count(e => e.Id == id) > 0;
        }
    }
}
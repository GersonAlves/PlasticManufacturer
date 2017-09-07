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
    public class CustomerStatusController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/CustomerStatus
        public IQueryable<CustomerStatus> GetCustomersStatus()
        {
            return db.CustomersStatus;
        }

        // GET: api/CustomerStatus/5
        [ResponseType(typeof(CustomerStatus))]
        public IHttpActionResult GetCustomerStatus(int id)
        {
            CustomerStatus customerStatus = db.CustomersStatus.Find(id);
            if (customerStatus == null)
            {
                return NotFound();
            }

            return Ok(customerStatus);
        }

        // PUT: api/CustomerStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCustomerStatus(int id, CustomerStatus customerStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customerStatus.Id)
            {
                return BadRequest();
            }

            db.Entry(customerStatus).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerStatusExists(id))
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

        // POST: api/CustomerStatus
        [ResponseType(typeof(CustomerStatus))]
        public IHttpActionResult PostCustomerStatus(CustomerStatus customerStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CustomersStatus.Add(customerStatus);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = customerStatus.Id }, customerStatus);
        }

        // DELETE: api/CustomerStatus/5
        [ResponseType(typeof(CustomerStatus))]
        public IHttpActionResult DeleteCustomerStatus(int id)
        {
            CustomerStatus customerStatus = db.CustomersStatus.Find(id);
            if (customerStatus == null)
            {
                return NotFound();
            }

            db.CustomersStatus.Remove(customerStatus);
            db.SaveChanges();

            return Ok(customerStatus);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerStatusExists(int id)
        {
            return db.CustomersStatus.Count(e => e.Id == id) > 0;
        }
    }
}
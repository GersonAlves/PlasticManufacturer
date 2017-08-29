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
using PlasticManufacturer.Domain.Entities.Adresses;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class AddressTypesController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/AddressTypes
        public IQueryable<AddressType> GetAddressTypes()
        {
            return db.AddressTypes;
        }

        // GET: api/AddressTypes/5
        [ResponseType(typeof(AddressType))]
        public IHttpActionResult GetAddressType(int id)
        {
            AddressType addressType = db.AddressTypes.Find(id);
            if (addressType == null)
            {
                return NotFound();
            }

            return Ok(addressType);
        }

        // PUT: api/AddressTypes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAddressType(int id, AddressType addressType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != addressType.Id)
            {
                return BadRequest();
            }

            db.Entry(addressType).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressTypeExists(id))
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

        // POST: api/AddressTypes
        [ResponseType(typeof(AddressType))]
        public IHttpActionResult PostAddressType(AddressType addressType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.AddressTypes.Add(addressType);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = addressType.Id }, addressType);
        }

        // DELETE: api/AddressTypes/5
        [ResponseType(typeof(AddressType))]
        public IHttpActionResult DeleteAddressType(int id)
        {
            AddressType addressType = db.AddressTypes.Find(id);
            if (addressType == null)
            {
                return NotFound();
            }

            db.AddressTypes.Remove(addressType);
            db.SaveChanges();

            return Ok(addressType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AddressTypeExists(int id)
        {
            return db.AddressTypes.Count(e => e.Id == id) > 0;
        }
    }
}
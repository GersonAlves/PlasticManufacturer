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
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;
using System.Web.Http.Cors;

namespace PlasticManufacturer.API.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class CarriersController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Carriers
        public IQueryable<Carrier> GetCarriers()
        {
            return db.Carriers;
        }

        // GET: api/Carriers/5
        [ResponseType(typeof(Carrier))]
        public async Task<IHttpActionResult> GetCarrier(int id)
        {
            Carrier carrier = await db.Carriers.FindAsync(id);
            if (carrier == null)
            {
                return NotFound();
            }

            return Ok(carrier);
        }

        // PUT: api/Carriers/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCarrier(int id, Carrier carrier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carrier.Id)
            {
                return BadRequest();
            }

            db.Entry(carrier).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarrierExists(id))
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

        // POST: api/Carriers
        [ResponseType(typeof(Carrier))]
        public async Task<IHttpActionResult> PostCarrier(Carrier carrier)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carriers.Add(carrier);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = carrier.Id }, carrier);
        }

        // DELETE: api/Carriers/5
        [ResponseType(typeof(Carrier))]
        public async Task<IHttpActionResult> DeleteCarrier(int id)
        {
            Carrier carrier = await db.Carriers.FindAsync(id);
            if (carrier == null)
            {
                return NotFound();
            }

            db.Carriers.Remove(carrier);
            await db.SaveChangesAsync();

            return Ok(carrier);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarrierExists(int id)
        {
            return db.Carriers.Count(e => e.Id == id) > 0;
        }
    }
}
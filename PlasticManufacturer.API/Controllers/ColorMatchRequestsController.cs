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
using PlasticManufacturer.Domain.Entities.Color_Match_Request;
using PlasticManufacturer.InfraStructure.Context;

namespace PlasticManufacturer.API.Controllers
{
    public class ColorMatchRequestsController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/ColorMatchRequests
        public IQueryable<ColorMatchRequest> GetColorMatchRequests()
        {
            return db.ColorMatchRequests;
        }

        // GET: api/ColorMatchRequests/5
        [ResponseType(typeof(ColorMatchRequest))]
        public async Task<IHttpActionResult> GetColorMatchRequest(int id)
        {
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            if (colorMatchRequest == null)
            {
                return NotFound();
            }

            return Ok(colorMatchRequest);
        }

        // PUT: api/ColorMatchRequests/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutColorMatchRequest(int id, ColorMatchRequest colorMatchRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != colorMatchRequest.Id)
            {
                return BadRequest();
            }

            db.Entry(colorMatchRequest).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ColorMatchRequestExists(id))
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

        // POST: api/ColorMatchRequests
        [ResponseType(typeof(ColorMatchRequest))]
        public async Task<IHttpActionResult> PostColorMatchRequest(ColorMatchRequest colorMatchRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ColorMatchRequests.Add(colorMatchRequest);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = colorMatchRequest.Id }, colorMatchRequest);
        }

        // DELETE: api/ColorMatchRequests/5
        [ResponseType(typeof(ColorMatchRequest))]
        public async Task<IHttpActionResult> DeleteColorMatchRequest(int id)
        {
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            if (colorMatchRequest == null)
            {
                return NotFound();
            }

            db.ColorMatchRequests.Remove(colorMatchRequest);
            await db.SaveChangesAsync();

            return Ok(colorMatchRequest);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ColorMatchRequestExists(int id)
        {
            return db.ColorMatchRequests.Count(e => e.Id == id) > 0;
        }
    }
}
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
    public class OpacitiesController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/Opacities
        public IQueryable<Opacity> GetOpacities()
        {
            return db.Opacities;
        }

        // GET: api/Opacities/5
        [ResponseType(typeof(Opacity))]
        public async Task<IHttpActionResult> GetOpacity(int id)
        {
            Opacity opacity = await db.Opacities.FindAsync(id);
            if (opacity == null)
            {
                return NotFound();
            }

            return Ok(opacity);
        }

        // PUT: api/Opacities/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutOpacity(int id, Opacity opacity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != opacity.Id)
            {
                return BadRequest();
            }

            db.Entry(opacity).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpacityExists(id))
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

        // POST: api/Opacities
        [ResponseType(typeof(Opacity))]
        public async Task<IHttpActionResult> PostOpacity(Opacity opacity)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Opacities.Add(opacity);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = opacity.Id }, opacity);
        }

        // DELETE: api/Opacities/5
        [ResponseType(typeof(Opacity))]
        public async Task<IHttpActionResult> DeleteOpacity(int id)
        {
            Opacity opacity = await db.Opacities.FindAsync(id);
            if (opacity == null)
            {
                return NotFound();
            }

            db.Opacities.Remove(opacity);
            await db.SaveChangesAsync();

            return Ok(opacity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OpacityExists(int id)
        {
            return db.Opacities.Count(e => e.Id == id) > 0;
        }
    }
}
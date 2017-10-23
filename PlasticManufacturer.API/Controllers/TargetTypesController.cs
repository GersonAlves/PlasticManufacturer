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
    public class TargetTypesController : ApiController
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: api/TargetTypes
        public IQueryable<TargetType> GetTargetTypes()
        {
            return db.TargetTypes;
        }

        // GET: api/TargetTypes/5
        [ResponseType(typeof(TargetType))]
        public async Task<IHttpActionResult> GetTargetType(int id)
        {
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            if (targetType == null)
            {
                return NotFound();
            }

            return Ok(targetType);
        }

        // PUT: api/TargetTypes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTargetType(int id, TargetType targetType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != targetType.Id)
            {
                return BadRequest();
            }

            db.Entry(targetType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TargetTypeExists(id))
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

        // POST: api/TargetTypes
        [ResponseType(typeof(TargetType))]
        public async Task<IHttpActionResult> PostTargetType(TargetType targetType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TargetTypes.Add(targetType);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = targetType.Id }, targetType);
        }

        // DELETE: api/TargetTypes/5
        [ResponseType(typeof(TargetType))]
        public async Task<IHttpActionResult> DeleteTargetType(int id)
        {
            TargetType targetType = await db.TargetTypes.FindAsync(id);
            if (targetType == null)
            {
                return NotFound();
            }

            db.TargetTypes.Remove(targetType);
            await db.SaveChangesAsync();

            return Ok(targetType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TargetTypeExists(int id)
        {
            return db.TargetTypes.Count(e => e.Id == id) > 0;
        }
    }
}
import { paginationOptsValidator } from 'convex/server';
// import { ConvexError, v } from 'convex/values';
import { v } from 'convex/values';

import { mutation, query } from './_generated/server';

export const createDocument = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // const user = await ctx.auth.getUserIdentity();

    // if (!user) {
    //   throw new ConvexError('Unauthorized');
    // }

    return ctx.db.insert('documents', {
      title: args.title || 'Documento sem título',
      initialContent: args.initialContent || '',
      // ownerId: user.subject,
      ownerId: 'system', // Placeholder for system user
    });
  },
});

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  },
});

export const removeDocumentById = mutation({
  args: { documentId: v.id('documents') },
  handler: async (ctx, args) => {
    // const user = await ctx.auth.getUserIdentity();

    // if (!user) {
    //   throw new ConvexError('Unauthorized');
    // }

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      // throw new ConvexError('Documento não encontrado');
      throw new Error('Documento não encontrado');
    }

    // const isOwner = document.ownerId === user.subject;

    // if (!isOwner) {
    //   throw new ConvexError('Não autorizado');
    // }

    return ctx.db.delete(args.documentId);
  },
});

export const updateDocumentById = mutation({
  args: { documentId: v.id('documents'), title: v.string() },
  handler: async (ctx, args) => {
    // const user = await ctx.auth.getUserIdentity();

    // if (!user) {
    //   throw new ConvexError('Unauthorized');
    // }

    const document = await ctx.db.get(args.documentId);
    if (!document) {
      // throw new ConvexError('Documento não encontrado');
      throw new Error('Documento não encontrado');
    }

    // const isOwner = document.ownerId === user.subject;

    // if (!isOwner) {
    //   throw new ConvexError('Não autorizado');
    // }

    return ctx.db.patch(args.documentId, { title: args.title });
  },
});

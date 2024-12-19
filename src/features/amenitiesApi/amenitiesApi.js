
import { api } from "../api/api"

export const amenities = api.injectEndpoints({
  endpoints: (builder) => ({
  
    
    addAmenities: builder.mutation({
      query: (values) => ({
        url: '/amenities/add_amenities',
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['amentitiesTag'],
    }),

    getAmenities: builder.query({
      query: () => ({
          url: '/amenities/all_amenities',
          method: "GET"
      }),
      providesTags:["amentitiesTag"]
  }),
  enableGetAmenities: builder.query({
    query: () => ({
        url: '/amenities/all_amenities_user',
        method: "GET"
    }),
    providesTags:["amentitiesTag"]
}),

  updateAmenitiesData: builder.mutation({
    query: ({ _id, ...data}) => ({
        url: `/amenities/update_amenities/${_id}`,
        method: "PUT",
        body: data,

    }),
    invalidatesTags:["amentitiesTag"]

  }),


    deleteAmenties: builder.mutation({
    query: ({ _id }) => ({
        url: `/amenities/amenities_status/${_id}`,
        method: "PUT",
        
    }),
    invalidatesTags:["amentitiesTag"]

  }),

  

  }),
});

export const { useAddAmenitiesMutation, useGetAmenitiesQuery, useUpdateAmenitiesDataMutation, useDeleteAmentiesMutation,
  useEnableGetAmenitiesQuery
 } = amenities;



